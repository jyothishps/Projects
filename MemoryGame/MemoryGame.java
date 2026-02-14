import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MemoryGame extends JFrame {
    private static final int GRID_SIZE = 4;
    
    private Card[] cards;
    private Card firstCard = null;
    private Card secondCard = null;
    private int matchesFound = 0;
    private javax.swing.Timer flipBackTimer;
    private JLabel statusLabel;
    private JLabel movesLabel;
    private int moveCount = 0;
    
    public MemoryGame() {
        setTitle("Memory Card Game");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(new BorderLayout());
        
        // Set light blue background
        getContentPane().setBackground(new Color(240, 248, 255));
        
        // ===== TOP SECTION: Beautiful Heading =====
        JPanel headerPanel = new JPanel();
        headerPanel.setLayout(new BorderLayout());
        headerPanel.setBackground(Color.BLACK);
        headerPanel.setBorder(BorderFactory.createEmptyBorder(30, 20, 30, 20));
        
        JLabel headingLabel = new JLabel("Flip-Flop", SwingConstants.CENTER);
        headingLabel.setFont(new Font("Courier new", Font.BOLD, 50));
        headingLabel.setForeground(Color.WHITE);
        headerPanel.add(headingLabel, BorderLayout.CENTER);
        
        add(headerPanel, BorderLayout.NORTH);
        
        // ===== STATUS BAR =====
        JPanel statusPanel = new JPanel();
        statusPanel.setBackground(Color.BLACK);
        statusPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        statusPanel.setLayout(new FlowLayout(FlowLayout.CENTER, 40, 0));
        
        statusLabel = new JLabel("Find all matching pairs!");
        statusLabel.setFont(new Font("Arial", Font.BOLD, 20));
        statusLabel.setForeground(new Color(70, 130, 180));
        
        movesLabel = new JLabel("Moves: 0");
        movesLabel.setFont(new Font("Arial", Font.BOLD, 20));
        movesLabel.setForeground(new Color(70, 130, 180));
        
        statusPanel.add(statusLabel);
        statusPanel.add(movesLabel);
        
        // ===== CENTER: Game Board (centered in the screen) =====
        JPanel centerWrapper = new JPanel(new GridBagLayout());
        centerWrapper.setBackground(Color.BLACK);
        
        JPanel gamePanel = new JPanel();
        gamePanel.setLayout(new GridLayout(GRID_SIZE, GRID_SIZE, 12, 12));
        gamePanel.setBackground(new Color(52, 73, 94)); // Dark background between cards
        gamePanel.setBorder(BorderFactory.createCompoundBorder(
            BorderFactory.createLineBorder(new Color(70, 130, 180), 4),
            BorderFactory.createEmptyBorder(20, 20, 20, 20)
        ));
        
        initializeCards();
        for (Card card : cards) {
            gamePanel.add(card);
        }
        
        centerWrapper.add(gamePanel);
        
        // Combine status and game in center panel
        JPanel mainCenterPanel = new JPanel(new BorderLayout());
        mainCenterPanel.setBackground(new Color(240, 248, 255));
        mainCenterPanel.add(statusPanel, BorderLayout.NORTH);
        mainCenterPanel.add(centerWrapper, BorderLayout.CENTER);
        
        add(mainCenterPanel, BorderLayout.CENTER);
        
        // ===== BOTTOM: Buttons =====
        JPanel bottomPanel = new JPanel();
        bottomPanel.setBackground(Color.BLACK);
        bottomPanel.setBorder(BorderFactory.createEmptyBorder(20, 20, 30, 20));
        
        JButton resetButton = new JButton("🔄 New Game");
        resetButton.setFont(new Font("Segoe UI Emoji", Font.BOLD, 18));
        resetButton.setPreferredSize(new Dimension(180, 50));
        resetButton.setBackground(new Color(34, 139, 34)); // Green
        resetButton.setForeground(Color.WHITE);
        resetButton.setFocusPainted(false);
        resetButton.setBorder(BorderFactory.createLineBorder(new Color(34, 139, 34), 2));
        resetButton.addActionListener(e -> resetGame());
        
        // Add hover effect
        resetButton.addMouseListener(new MouseAdapter() {
            public void mouseEntered(MouseEvent e) {
                resetButton.setBackground(new Color(50, 205, 50));
                resetButton.setBorder(BorderFactory.createLineBorder(new Color(50, 205, 50), 2));
            }
            public void mouseExited(MouseEvent e) {
                resetButton.setBackground(new Color(34, 139, 34));
                resetButton.setBorder(BorderFactory.createLineBorder(new Color(34, 139, 34), 2));
            }
        });
        
        bottomPanel.add(resetButton);
        add(bottomPanel, BorderLayout.SOUTH);
        
        // Make window full screen (maximized with title bar)
        setExtendedState(JFrame.MAXIMIZED_BOTH);
        setLocationRelativeTo(null);
        setMinimumSize(new Dimension(900, 700));
    }
    
    private void initializeCards() {
        List<Integer> values = new ArrayList<>();
        for (int i = 1; i <= (GRID_SIZE * GRID_SIZE) / 2; i++) {
            values.add(i);
            values.add(i);
        }
        
        Collections.shuffle(values);
        
        cards = new Card[GRID_SIZE * GRID_SIZE];
        for (int i = 0; i < cards.length; i++) {
            cards[i] = new Card(values.get(i));
            cards[i].addActionListener(new CardClickListener());
        }
    }
    
    private class CardClickListener implements ActionListener {
        @Override
        public void actionPerformed(ActionEvent e) {
            Card clickedCard = (Card) e.getSource();
            
            if (clickedCard.isMatched() || clickedCard.isFlipped()) {
                return;
            }
            
            if (firstCard != null && secondCard != null) {
                return;
            }
            
            clickedCard.flip();
            
            if (firstCard == null) {
                firstCard = clickedCard;
            } else {
                secondCard = clickedCard;
                moveCount++;
                movesLabel.setText("Moves: " + moveCount);
                
                checkForMatch();
            }
        }
    }
    
    private void checkForMatch() {
        if (firstCard.getValue() == secondCard.getValue()) {
            firstCard.setMatched(true);
            secondCard.setMatched(true);
            matchesFound++;
            statusLabel.setText("Match found! (" + matchesFound + "/" + (GRID_SIZE * GRID_SIZE / 2) + ")");
            
            firstCard = null;
            secondCard = null;
            
            if (matchesFound == (GRID_SIZE * GRID_SIZE) / 2) {
                statusLabel.setText("YOU WON in " + moveCount + " moves!");
                
                // // Victory popup
                // SwingUtilities.invokeLater(() -> {
                //     int result = JOptionPane.showConfirmDialog(
                //         this,
                //         "🎉 Congratulations! You Won! 🎉\n\n" +
                //         "Total Moves: " + moveCount + "\n\n" +
                //         "Play again?",
                //         "Victory!",
                //         JOptionPane.YES_NO_OPTION,
                //         JOptionPane.INFORMATION_MESSAGE
                //     );
                    
                //     if (result == JOptionPane.YES_OPTION) {
                //         resetGame();
                //     }
                // });
            }
        } else {
            statusLabel.setText("Not a match... try again!");
            
            if (flipBackTimer != null) {
                flipBackTimer.stop();
            }
            
            flipBackTimer = new javax.swing.Timer(1000, e -> {
                firstCard.flip();
                secondCard.flip();
                firstCard = null;
                secondCard = null;
                statusLabel.setText("Find all matching pairs!");
            });
            flipBackTimer.setRepeats(false);
            flipBackTimer.start();
        }
    }
    
    private void resetGame() {
        firstCard = null;
        secondCard = null;
        matchesFound = 0;
        moveCount = 0;
        
        if (flipBackTimer != null) {
            flipBackTimer.stop();
        }
        
        // Get the center wrapper, then the game panel inside it
        JPanel mainCenterPanel = (JPanel) getContentPane().getComponent(1);
        JPanel centerWrapper = (JPanel) mainCenterPanel.getComponent(1);
        JPanel gamePanel = (JPanel) centerWrapper.getComponent(0);
        gamePanel.removeAll();
        
        initializeCards();
        for (Card card : cards) {
            gamePanel.add(card);
        }
        
        statusLabel.setText("Find all matching pairs!");
        movesLabel.setText("Moves: 0");
        gamePanel.revalidate();
        gamePanel.repaint();
    }
    
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            MemoryGame game = new MemoryGame();
            game.setVisible(true);
        });
    }
}